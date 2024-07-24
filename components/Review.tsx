import { HandThumbUpIcon as HandThumbUpIconLine } from "@heroicons/react/24/outline";
import { StarIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type comment = {
  reviewId: any;
  userId:any;
  driverId:any;
  reservationId:any;
  userName: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  note: number;
  likes: number;
  dislikes: number;
  icon:string
};

type LikeState = {
  [key: number]: { isLiked: Boolean; isUnliked: Boolean};
};

function StarRating(rating: number) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <StarIcon key={i} className="w-5 h-5 text-[var(--tertiary)]" />
      );
    } else {
      stars.push(<StarIcon key={i} className="w-5 h-5 text-[#AAAAAA]" />);
    }
  }

  return <>{stars}</>;
}

export default function Review({
  comment,
  index,
}: {
  comment: comment;
  index: number;
}) {
  const driverId = "797d6b41-5b9a-41ba-93d3-4a56418e4294";
  const userId = "b21ccd75-5be8-4129-bd14-f4837b935fa3";

  const COMMENT_LIKES_PATH = "http://localhost:8000/likes";

  const [likeState, setLikeState] = useState<LikeState>({});

  const sendLike = async (LikeType: string) => {
    var LikesData = {
      commentId: comment.reviewId,
      driverId: driverId,
      type: LikeType,
    };

    if (LikeType == "like") {
      const currentState = likeState[index] || {
        isLiked: false,
        isUnliked: false,
      };
      const updatedState = {
        isLiked: !currentState.isLiked,
        isUnliked: currentState.isUnliked ? false : false,
      };
      const updatedLikeState = { ...likeState, [index]: updatedState };
      setLikeState(updatedLikeState);
      
      comment.likes += updatedState.isLiked ? 1 : -1;
      comment.dislikes += currentState.isUnliked ? -1 : 0;
    } else {
      const currentState = likeState[index] || {
        isLiked: false,
        isUnliked: false,
      };
      const updatedState = {
        isLiked: currentState.isUnliked ? false : false,
        isUnliked: !currentState.isUnliked,
      };
      const updatedLikeState = { ...likeState, [index]: updatedState };
      setLikeState(updatedLikeState);
      
      comment.likes += currentState.isLiked ? -1 : 0;
      comment.dislikes += updatedState.isUnliked ? 1 : -1;
    }

    const reviewId = "123e4567-e89b-12d3-a456-426614174000";
    const userId = "b21ccd75-5be8-4129-bd14-f4837b935fa3";
    const updatedReview = {
      rating: 4,
      comment: "Great driver!",
      emojis: ["thumbs_up", "heart_eyes"],
    };

    /* axios
      .put(`/api/reviews/update/${reviewId}`, updatedReview, {
        headers: {
          "User-Id": userId,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      }); */
  };

  return (
    <div
      key={index}
      className="bg-[var(--bg-1)] rounded-2xl p-3 sm:p-4 lg:p-6 mb-2"
    >
      <div className="flex items-center flex-wrap justify-between gap-4 ">
        <div className="flex gap-5 items-center">
          <div className="flex-grow">
            <h5 className="mb-1 font-semibold"> {comment.userName}</h5>
          </div>
        </div>

        <div className="text-sm-end">
          <p className="mb-1">
            {" "}
            {comment.createdAt} à {comment.updatedAt}
          </p>
        </div>
      </div>
      <div className="border border-dashed my-2"></div>
      <div className="flex gap-1 mb-3">{StarRating(comment.note)}</div>
      <p className="mb-0 clr-neutral-500">{comment.comment}</p>
      <div className="border border-dashed my-2"></div>
      <div className="flex flex-wrap items-center gap-10">
        <div
          className={`flex items-center gap-2 text-blue cursor-pointer ${
            likeState[index]?.isLiked ? "text-blue-500" : ""
          }`}
          onClick={() => sendLike("like")}
        >
          {likeState[index]?.isLiked ? (
            <HandThumbUpIcon className="w-5 h-5" />
          ) : (
            <HandThumbUpIconLine className="w-5 h-5" />
          )}
          <span className="inline-block"> {comment.likes} </span>
        </div>

        <div
          className={`flex items-center gap-2 text-red cursor-pointer ${
            likeState[index]?.isUnliked ? "text-red-500" : ""
          }`}
          onClick={() => sendLike("dislike")}
        >
          {likeState[index]?.isUnliked ? (
            <HandThumbUpIcon className="w-5 h-5 rotate-180" />
          ) : (
            <HandThumbUpIconLine className="w-5 h-5 rotate-180" />
          )}
          <span className="inline-block"> {comment.dislikes} </span>
        </div>
      </div>
    </div>
  );
}
