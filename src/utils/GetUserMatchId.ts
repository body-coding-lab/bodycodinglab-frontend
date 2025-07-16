import { useAuthStore } from "@/stores/auth.store";

async function GetUserMatchId() {
   
    const accessToken = useAuthStore((state) => state.token);
    if(!accessToken) return null;

    try{
        const res = await fetch("/api/v2/users/me/match-id", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if(!res.ok){
            throw new Error("matchId 가져오기 실패.");
        }
        const data = await res.json();
        return data.matchId ?? null;
    } catch(error){
        alert("matchId 요청 에러.");
        return null;
    }
}

export default GetUserMatchId