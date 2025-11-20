"use client";

import BaseModal from "./basemodal";
import Image from "next/image";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function AlertModal({ isOpen, message, onClose }: AlertModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div
        className="
          flex flex-col items-center text-center
          w-[298px] h-[183px]
          pt-6 pb-5 px-4
          justify-between
        "
      >
        {/* 아이콘 + 메시지 */}
        <div className="flex flex-col items-center gap-3">
          <Image src="/images/check.png" alt="경고" width={24} height={24} />
          <p className="text-[16px] leading-[22px]">{message}</p>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className="
            w-[80px] h-[37px]
            rounded-md border border-[#E44536] text-[#E44536]
            hover:bg-[#fde9e6] transition
            text-[15px] font-medium
          "
        >
          확인
        </button>
      </div>
    </BaseModal>
  );
}
