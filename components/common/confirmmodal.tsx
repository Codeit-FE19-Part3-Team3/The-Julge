"use client";

import BaseModal from "./basemodal";
import Image from "next/image";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onCancel}>
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
          <Image src="/images/check.png" alt="체크" width={24} height={24} />
          <p className="text-[16px] leading-[22px]">{message}</p>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="
              w-[108px] h-[37px]
              border border-[#E44536] text-[#E44536]
              rounded-md hover:bg-[#fde9e6]
              text-[15px]
            "
          >
            아니요
          </button>

          <button
            onClick={onConfirm}
            className="
              w-[108px] h-[37px]
              bg-[#E44536] text-white
              rounded-md hover:bg-[#d63a2d]
              text-[15px]
            "
          >
            예
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
