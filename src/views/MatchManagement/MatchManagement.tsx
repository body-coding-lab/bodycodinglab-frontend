import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import { GetTrainerMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get-trainer-matchWatingList.response.dto";
import { GetMemberMatchWaitingListRequest } from "@/apis/matchWaitingList/get-member-matchWaitingList.api";
import { GetMemberMatchRequest } from "@/apis/match/get-member-match.api";
import { GetMemberMatchResponseDto } from "@/dtos/match/response/get-member-match.response.dto";
import { GetMemberMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get-member-matchWatingList.response.dto";
import ReadMemberMatchWatingList from "../matchWaitingList/ReadMemberMatchWatingList";
import ReadMemberMatch from "../match/ReadMemberMatch";

function MatchManagement() {
  const [cookies] = useCookies(["accessToken"]);
  const [matchData, setMatchData] = useState<GetMemberMatchResponseDto | null>(
    null
  );
  const [waitingData, setWaitingData] =
    useState<GetMemberMatchWaitingListResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTrainerData = async () => {
      setLoading(true);
      const token = cookies.accessToken;
      if (!token) {
        setLoading(false);
        alert("접근 권한이 존재하지 않습니다.");
        navigate("/");
      }

      try {
        const matchResponse = await GetMemberMatchRequest(token);
        if (matchResponse?.data) {
          setMatchData(matchResponse.data);
        } else {
          const waitingResponse = await GetMemberMatchWaitingListRequest(
            token
          );
          if (waitingResponse?.data) {
            setWaitingData(waitingResponse.data);
          }
        }
      } catch (error) {
        console.error("매칭 정보를 불러오지 못했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    loadingTrainerData();
  }, []);

  
  if (loading) return <p>로딩 중입니다...</p>;
  if (matchData) return (
    <div>
      <div style={{display: "flex"}}>
      <MyPageSidebar/> 
      <div style={{marginTop: "25px"}}>
      <h2 style={{color: "#3F4756"}}>매칭 조회</h2>
      <ReadMemberMatch />
      </div>
      </div>

    </div>
  );
  if (waitingData) return (
  <div>
    <div style={{display: "flex"}}>
    <MyPageSidebar/>
    <div style={{marginTop: "25px"}}>
    <h2 style={{color: "#3F4756"}}>매칭 조회</h2> 
    <ReadMemberMatchWatingList />
    </div>
    </div>
  </div>

);
  return (
  <div>
    <div style={{display: "flex"}}>
      <MyPageSidebar/> 
      <div  style={{marginTop: "25px"}}>
        <h2  style={{color: "#3F4756"}}>매칭 조회</h2>
        <br />
        <p>매칭 신청 기록이 존재하지 않습니다.</p>
      </div>
    </div>
  </div>);
}

export default MatchManagement;