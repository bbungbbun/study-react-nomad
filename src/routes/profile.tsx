import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  height: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
  margin-right: 20px;
`;

const BtnNameChange = styled.button`
background-color: #1d9bf0;
color: white;
border: none;
padding: 10px 20px;
border-radius: 20px;
font-size: 16px;
cursor: pointer;
&:hover,
&:active {
  opacity: 0.9;
}
`;

const BtnNameSubmit = styled.input`
background-color: #1d9bf0;
color: white;
border: none;
padding: 10px 20px;
border-radius: 20px;
font-size: 16px;
cursor: pointer;
&:hover,
&:active {
  opacity: 0.9;
}
&:disabled {
  opacity: 0.5;
}
`;

const NameInput = styled.input`
  border: 2px solid white;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  background-color: black;
  resize: none;
  margin-right: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [userName, setUserName] = useState(user?.displayName);
  const [changeName, setChangeName] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)

    if (!user || isLoading || userName === "") return;
    try {
      setLoading(true);
      await updateProfile(user, { displayName: userName});
    } catch (e) {
      console.log(e);
    } finally {
      setChangeName(false);
      setLoading(false);
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      {changeName ? (
        <Form onSubmit={onSubmitName}>
          <NameInput 
            type="text"
            placeholder="변경할 닉네임을 입력하세요"
            onChange={onChangeName}/>
          <BtnNameSubmit 
            type="submit"
            disabled={isLoading}
            value={isLoading ? "Updating..." : "submit"}/>
        </Form>
        ) : (
          <div>
            <Name>{user?.displayName ?? "Anonymous"}</Name>
            <BtnNameChange onClick={()=>setChangeName(true)}>change name</BtnNameChange>
          </div>
        )}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}