"use client";
import React from 'react';

// import { remoteVideoRef, localVideoMobileRef, localVideoDesktopRef } from './videoRefs';
// import Loader from './Loader';
// import ChatArea from './ChatArea';
// import { Theme, EmojiStyle } from 'emoji-picker-react';
// import EmojiPicker from 'emoji-picker-react';
// import { isDark, buttonState, isPressed, setIsPressed, setShowEmojiPicker, showEmojiPicker, setMessage, sendMessage, message, handleEscButtonClick } from './yourStateLogic';

export default function jbsj() {
  return (
    <div>
      <main className="flex flex-col flex-1 min-h-0 overflow-hidden w-full">
        <div className="flex flex-col xl:flex-row gap-4 p-4 flex-1 min-h-0 overflow-hidden box-border">
          {/* Column 1 - Fixed width on large screens */}
          <div className="relative flex flex-col gap-4 w-full sm:flex-row xl:flex-col xl:w-[540px]">
            {/* Video Box (Box 1) - Main Video */}
            <div className="relative bg-[#4a4a4a] shadow flex-1 overflow-hidden rounded-tl-lg rounded-tr-lg sm:rounded-tr-none aspect-[16/12] sm:h-[400px] sm:aspect-auto">
              <video
                autoPlay
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover scale-x-[-1] m-0 p-0 border-none"
              />

              {/* ✅ Watermark - bottom left */}
              <div className="absolute bottom-2 z-10">
                <img
                  src="/watermark.png"
                  alt="Watermark"
                  className="w-[160px] sm:w-[200px] object-contain opacity-90 pointer-events-none select-none"
                />
              </div>

              {/* Mobile Local Video */}
              <div className="absolute top-2 right-2 text-white flex items-center justify-center sm:hidden border rounded border-white/10 z-20">
                <video
                  muted
                  autoPlay
                  playsInline
                  className="w-[80px] h-[60px] object-cover scale-x-[-1]"
                />
              </div>
            </div>

            {/* Box 2 - Desktop Local Video */}
            <div className="bg-[#4a4a4a] shadow flex-1 overflow-hidden hidden sm:flex rounded-bl-none xl:rounded-bl-lg rounded-tr-lg xl:rounded-tr-none h-[400px]">
              <video
                muted
                autoPlay
                playsInline
                className="w-full h-full object-cover scale-x-[-1] m-0 p-0 border-none"
              />
            </div>
          </div>



          {/* Column 2 - Takes remaining space */}
          <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
            {/* <ChatArea messages={messages} /> */}

            {/* Bottom Input Section */}
            <div className="flex flex-1 gap-2 sm:gap-4">
              {/* Start Button */}
              <button
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
              // onClick={handleEscButtonClick}
              // className={`
              //   flex flex-col items-center justify-center
              //   select-none font-bold rounded-bl-lg xl:rounded-bl-none
              //   transition-all duration-100 ease-in-out
              //   w-[80px] h-[60px]
              //   sm:w-[100px] sm:h-[70px] sm:text-[20px]
              //   md:w-[130px] md:h-[85px] md:text-[24px]
              //   ${isPressed ? "shadow-inner scale-[0.98]" : "shadow-lg"}
              //   ${
              //     buttonState !== "Start"
              //       ? isDark
              //         ? "bg-[#0a0a0a] text-white border border-white/10"
              //         : "bg-white text-black border border-gray-200"
              //       : isPressed
              //       ? "bg-gradient-to-b from-[#6eb4f5] to-[#0470d9] text-white"
              //       : "bg-gradient-to-b from-[#7ebeff] to-[#0883fe] text-white"
              //   }
              // `}
              >
                {/* {buttonState} */}
                <span className="text-sm sm:text-sm font-bold mt-1 text-[#73cce7]">Esc</span>
              </button>

              {/* Textarea Container */}
              <div
              // className={`
              //   relative flex-1
              //   ${
              //     isDark
              //       ? "bg-[#0a0a0a] text-white border border-white/10"
              //       : "bg-white text-black"
              //   }
              //   p-2 shadow flex items-center
              //   min-h-[60px] sm:min-h-[70px] md:min-h-[85px]
              //   rounded-br-lg md:rounded-br-none
              // `}
              >
                {/* Textarea */}
                <textarea
                  className="w-full h-full resize-none outline-none border-none bg-transparent text-sm sm:text-base pr-10"
                  placeholder="Type your message..."
                  // value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />

                {/* Emoji Picker Button */}
                <button
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl lg:text-4xl cursor-pointer hidden sm:block"
                >
                  😊
                </button>

                {/* Emoji Picker Dropdown */}
                {/* {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 z-50">
                    <EmojiPicker
                      onEmojiClick={(emoji) => {
                        setMessage((prev) => prev + emoji.emoji);
                        setShowEmojiPicker(false);
                      }}
                      theme={Theme.LIGHT}
                      emojiStyle={EmojiStyle.FACEBOOK}
                    />
                  </div>
                )} */}
              </div>

              {/* Send Button (Hidden below sm) */}
              <div
              // className={`
              //   hidden sm:flex flex-col items-center justify-center
              //   w-[80px] h-[60px] sm:w-[100px] sm:h-[70px] md:w-[130px] md:h-[85px]
              //   ${
              //     isDark
              //       ? "bg-[#0a0a0a] border border-white/10 text-white"
              //       : "bg-white text-gray-700"
              //   }
              //   rounded shadow select-none cursor-pointer rounded-br-lg
              // `}
              // onClick={sendMessage}
              >
                <span className="text-[18px] sm:text-[20px] md:text-[24px]">Send</span>
                <span className="text-xs sm:text-sm text-blue-400 font-bold mt-1">Enter</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
