import React from "react";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Index = () => {
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
};

export default Index;
