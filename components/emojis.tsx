"use client";
import { HandThumbDownIcon, HandThumbUpIcon, HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import MyTable from '../app/(common-layout)/(agent)/MyTable';
import page from '../app/(common-layout)/(agent)/agent-details-review/page';
import { compileFunction } from "vm";
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const driverId = "797d6b41-5b9a-41ba-93d3-4a56418e4294";
const userId = "b21ccd75-5be8-4129-bd14-f4837b935fa3";
export default function Emojis() {
    //const searchParams = useSearchParams();
    console.log("=======================", driverId)
    const DRIVER_DATA_PATH = "/get-driver-data"
    const DRIVER_EMOJIS_PATH = "http://localhost:8000/emojis"
  
    const [refresh,setRefresh]=useState(true);
  
    const [iconsNumber, setIconsNumber] = useState({
      driverId:driverId,
      handUp: 0,
      handDown: 0,
      angry: 0,
      heart: 0,
      totalReviews:0
    });
    
   /*  useEffect(() => {
        const interval = setInterval(() => {
          setRefresh((prevRefresh) => !prevRefresh);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []); */
    
    useEffect(() => {
        const fetchIconsNumber = async () => {
          try {
            console.log("Dans le fetch..............................")
            const response = await axios.get(DRIVER_EMOJIS_PATH+'/'+driverId);
            if(response.data!==null){
              setIconsNumber(response.data);
            }
          } catch (error) {
            console.error('Erreur lors de la récupération du nombre d\'icônes :', error);
          }
        };
    
        fetchIconsNumber();
      }, [refresh]);
    
    const sendEmoji = async (emojiName: String) => {
        var emojiData = {
          userId: userId,
          driverId: driverId, 
          emojiName: emojiName,
        }
        console.log("Here is the emoji: ",emojiData);
        try {
          await axios.put(DRIVER_EMOJIS_PATH, emojiData);
          console.log('Emoji envoyé avec succès au backend');
          setRefresh(!refresh);
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'emoji au backend:', error);
        }
      };
    
    return (
        <div className="flex justify-evenly">
            <div className='flex items-center px-2 mr-1 border ovenflow-hidden border-pink-500 rounded-full hover:bg-pink-200 cursor-pointer'
              onClick={()=>{sendEmoji("heart")}}>
              <HeartIcon className="w-5 h-5 text-red-500" /> <span className='ml-2'>{iconsNumber.heart}</span>
            </div>
            <div className='flex items-center px-2 mr-1 border ovenflow-hidden border-blue-500 rounded-full hover:bg-blue-200 cursor-pointer'
              onClick={()=>{sendEmoji("hand-up")}}>
              <HandThumbUpIcon className="w-5 h-5 text-blue-500" /> <span className='ml-2'>{iconsNumber.handUp}</span>
            </div>
            <div className='flex items-center px-2 mr-1 border ovenflow-hidden border-gray-500 rounded-full hover:bg-gray-200 cursor-pointer'
              onClick={()=>{sendEmoji("hand-down")}}>
              <HandThumbDownIcon className="w-5 h-5 text-gray-900" /> <span className='ml-2'>{iconsNumber.handDown}</span>
            </div>
            <div className='flex items-center px-2 mr-1 border ovenflow-hidden border-red-500 rounded-full hover:bg-red-200 cursor-pointer'
              onClick={()=>{sendEmoji("angry")}}>
                <span>😡</span> <span className='ml-2'> {iconsNumber.angry}</span>
            </div>
        </div>
    );
}