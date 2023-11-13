"use client";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";

const FacebookChatBox = () => {
  const PAGE_ID = "103874388861433";
  const APP_ID = "4639220812794134";
  const params = useParams();
  return (
    <MessengerCustomerChat
      pageId={PAGE_ID}
      appId={APP_ID}
    //   language={params.locale}
    />
  );
};

export default FacebookChatBox;
