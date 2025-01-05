import { useEffect, useState } from "react";

declare global {
  interface Window {
    Flutter?: {
      postMessage: (message: string) => void;
      setSafeHeight: (height: number) => void;
    };
  }
}

/**
 * 导航到原生页面的函数
 */
export const navigateToNative = (route: string) => {
  if (window.Flutter) {
    window.Flutter.postMessage("navigate:" + route);
  } else {
    console.warn("JS Bridge error");
  }
};

export const useSafeAreaHeight = () => {
  const getSafeAreaHeight = () => {
    if (window.Flutter) {
      window.Flutter.postMessage("getSafeHeight");
    } else {
      console.warn("JS Bridge error");
    }
  };

  const [safeAreaHeight, setSafeAreaHeight] = useState(0);
  useEffect(() => {
    // 定义全局函数以接收安全高度
    if (window.Flutter)
      window.Flutter.setSafeHeight = (height: number) => {
        console.log("Safe height from Flutter:", height);
        setSafeAreaHeight(height);
      };

    // 请求安全高度
    getSafeAreaHeight();
  }, []);

  return safeAreaHeight;
};
