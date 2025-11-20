import { useState } from "react";
import AlertModal from "../components/common/alertmodal";
import ConfirmModal from "../components/common/confirmmodal";

export default function Home() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div className="p-10">

      {/* Confirm Modal 버튼 */}
      <button
        onClick={() => setConfirmOpen(true)}
        className="border p-2 bg-blue-200"
      >
        Confirm Modal 열기
      </button>

      <ConfirmModal
        isOpen={confirmOpen}
        message="신청을 거절하시겠어요?"
        onConfirm={() => {
          alert("확인 클릭됨");
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Alert Modal 버튼 */}
      <button
        className="border p-2 mt-4"
        onClick={() => setAlertOpen(true)}
      >
        Alert Modal 열기
      </button>

      <AlertModal
        isOpen={alertOpen}
        message="가게 정보를 먼저 등록해 주세요."
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
}
