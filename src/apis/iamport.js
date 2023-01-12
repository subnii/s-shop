import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSetIamport = () => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";

    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";

    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
};

export const useIamportPayment = () => {
  const navigate = useNavigate();

  useSetIamport();

  const iamportPayment = (totalPrice) => {
    const { IMP } = window;

    IMP.init("imp28824362");

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: Date.now(),
        name: "테스트 결제",
        amount: totalPrice,
        buyer_tel: "010-5248-7496",
      },
      (rsp) => {
        if (rsp.success) {
          navigate("/");
        } else {
          alert("결제에 실패했습니다. 다시 결제해 주세요.");
        }
      }
    );
  };

  return {
    iamportPayment,
  };
};
