import React, { useEffect, useState } from "react";
import useUserStore from "../stores/useUserStore";
import { supabase } from "../lib/supabaseClient";

const Review = ({ itemId }) => {
  const [content, setContent] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);

  const { user } = useUserStore();
  const userId = user?.id;
  const avatarUrl = user?.user_metadata.avatar_url;
  const nickname = user?.user_metadata.nickname;

  const fetchReviewCount = async (itemId) => {
    const { count, error } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("item_id", itemId);

    if (error) {
      console.error("댓글 개수 가져오기 실패:", error.message);
    } else {
      setReviewCount(count);
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*") // profiles 조인 제거
      .eq("item_id", itemId)
      .order("created_at", { ascending: false });

    if (error) {
      // console.error("리뷰 가져오기 실패:", error.message);
    } else {
      // console.log("리뷰 리스트 확인:", data); // <-- 이거 확인!
      setReviews(data);
    }
  };

  const submitReview = async (
    e,
    userId,
    itemId,
    avatarUrl,
    nickname,
    content
  ) => {
    e.preventDefault();

    if (!userId) {
      alert("로그인 후 작성 가능합니다.");
      return;
    }

    const { data, error } = await supabase.from("reviews").insert([
      {
        content,
        user_id: userId,
        item_id: itemId,
        avatar_url: avatarUrl,
        nickname,
      },
    ]);

    if (error) {
      // console.error("리뷰 저장 실패:", error.message);
    } else {
      // console.log("리뷰 저장 성공:", data);
      setContent("");
      fetchReviews();
      fetchReviewCount(itemId);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchReviewCount(itemId);
  }, [itemId]);

  return (
    <div className="w-full max-w-4xl px-4 pb-16">
      <div className="font-bold py-2 text-lg">
        <span>댓글</span>
        <span className="ml-1">{reviewCount}</span>
      </div>
      <form
        onSubmit={(e) =>
          submitReview(e, userId, itemId, avatarUrl, nickname, content)
        }
      >
        <div id="input_container">
          <input
            value={content}
            className="w-full bg-gray-300 p-2 rounded-sm"
            type="text"
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button className="hidden">등록</button>
        </div>
      </form>

      {reviews.map((review, index, array) => (
        <div key={review.id}>
          <div className="flex py-2">
            <div className="w-10 h-10 mr-3">
              <img
                className="w-full h-full object-cover rounded-full"
                src={review.avatar_url || "/default-avatar.png"}
                alt=""
              />
            </div>
            <div>
              <div className="text-sm font-bold">
                {review.nickname || "익명"}
              </div>
              <div className="text-base">{review.content}</div>
            </div>
          </div>
          {array.length - 1 !== index && (
            <div className="w-full border-t border-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Review;
