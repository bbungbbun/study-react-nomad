import { useEffect, useState } from "react";

export default function useFetch(createdAt: number) {
  const [createdDate, setCreatedDate] = useState("");

  function dateSetter(createdAt: number){
    const date = new Date(createdAt)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let amOrPm = hours > 12 ? '오후' : '오전';
    let finalHour = hours > 12 ? hours - 12 : hours;
  
    return date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일 " + finalHour + ":" + (minutes > 9 ? minutes.toString() : "0" + minutes.toString()) + " " + amOrPm;
  }

  useEffect(() => {
  setCreatedDate(dateSetter(createdAt));
  }, []);

  return createdDate;
}
