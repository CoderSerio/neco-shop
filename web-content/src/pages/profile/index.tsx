import { useState } from "react";
import { Waterfall, WaterfallItem } from "../../common/components/waterfall";
import { useSafeAreaHeight } from "../../common/utils/jsb";
// import { Waterfall, WaterfallItem } from "../../common/components/waterfall";

interface UserProfile {
  avatar: string;
  name: string;
  followers: number;
  following: number;
}

const mockPics = [
  "https://cbu01.alicdn.com/img/ibank/2020/401/391/17571193104_1667149737.jpg",
  "https://th.bing.com/th/id/OIP.aXXHFwKtMzLHyVNshexqUQHaEK?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.7LoTnLVL0cOm8RuoKFupVAHaHa?rs=1&pid=ImgDetMain",
  "https://img.alicdn.com/i1/822511410/O1CN017M2Ase1MHp85a8Ynw_!!822511410.jpg",
  "https://img.alicdn.com/i3/3885973522/O1CN01P4uyD21bt7i5Eqzsi_!!3885973522.jpg",
  "https://img.alicdn.com/i4/2291555812/O1CN01dhsPt41snwouTAdFF_!!2291555812.jpg",
  "https://th.bing.com/th/id/OIP.y0xbInByjeA8RDPHZ1PXXwHaEv?rs=1&pid=ImgDetMain",
];

const mockUserProfile: UserProfile = {
  avatar: "https://example.com/avatar.jpg",
  name: "曹甚麽",
  followers: 30000,
  following: 99,
};
const mockData = Array.from({ length: 100 }, (_, i) => ({
  name: `测试 ${i + 1}`,
  image:
    "https://sns-webpic-qc.xhscdn.com/202501051803/b13ed2739b35f47c1528ab2274d6db13/1000g00823cf70b2fe0005oav5megkgsstu89rf0!nc_n_webp_mw_1",
  author: `用户 ${i + 1}`,
  price: Math.floor(Math.random() * 50) + 50,
  likes: Math.floor(Math.random() * 100),
}));
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * mockPics.length);
  return mockPics[randomIndex];
};

const ProfilePage = () => {
  const safeAreaHeight = useSafeAreaHeight();
  const [data, setData] = useState<{ [key: string]: WaterfallItem[] }>({
    我的交易: mockData.slice(0, 50),
    关注: mockData.slice(50),
  });

  const loadMore = () => {
    console.log("什么鬼");
    const newData = Array.from({ length: 20 }, (_, i) => ({
      name: `测试商品1 ${data.热门.length + data.最新.length + i + 1}`,
      image:
        "https://sns-webpic-qc.xhscdn.com/202501051803/b13ed2739b35f47c1528ab2274d6db13/1000g00823cf70b2fe0005oav5megkgsstu89rf0!nc_n_webp_mw_1",
      author: `neconeco ${data.热门.length + data.最新.length + i + 1}`,
      price: Math.floor(Math.random() * 50) + 50,
      likes: Math.floor(Math.random() * 100),
    }));

    setData({
      热门: [...data.热门, ...newData.filter((_, i) => i % 2 === 0)],
      最新: [...data.最新, ...newData.filter((_, i) => i % 2 !== 0)],
    });
  };

  const renderItem = (item: WaterfallItem) => {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          overflow: "hidden",
          transition: "transform 0.2s ease",
          cursor: "pointer",
          marginBottom: "4px",
          // ":hover": {
          //   transform: "translateY(-4px)",
          // },
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={getRandomImage()}
            alt={item.name}
            style={{
              width: "100%",
              aspectRatio: "1",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: "4px 8px",
              borderRadius: "16px",
              fontSize: "14px",
              color: "#ff6b6b",
              fontWeight: "600",
            }}
          >
            ¥{item.price}
          </div>
        </div>

        <div style={{ padding: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                marginRight: "8px",
                backgroundImage: `url(${getRandomImage()})`,
                backgroundSize: "cover",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "#666",
                fontWeight: "500",
              }}
            >
              {item.author}
            </span>
          </div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#262626",
              marginBottom: "4px",
              lineHeight: "1.4",
              textAlign: "left",
            }}
          >
            {item.name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#8e8e8e",
              fontSize: "14px",
            }}
          >
            <span>❤️ {item.likes}</span>
            <span style={{ margin: "0 8px" }}>•</span>
            <span>评论 {Math.floor(item.likes * 0.7)}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTab = (tabKey: string, isActive: boolean) => {
    return (
      <div
        style={{
          padding: "12px 24px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: isActive ? "600" : "normal",
          backgroundColor: isActive ? "#ffebee" : "transparent",
          color: isActive ? "#ff4081" : "#666",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {tabKey}
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        paddingTop: `${safeAreaHeight}px`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* 用户信息 */}
      <div
        style={{
          padding: "16px",
          height: "160px",
          backgroundColor: "#fff",
          backgroundImage:
            "url(https://web.doorzo.cn/data/Upload/d3df8d328986f710cc7b4eab604e1e3a.jpg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              "https://th.bing.com/th/id/OIP.y0xbInByjeA8RDPHZ1PXXwHaEv?rs=1&pid=ImgDetMain"
            }
            alt="Avatar"
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              marginRight: "16px",
            }}
          />
          <div
            style={{
              color: "#fff",
            }}
          >
            <div style={{ margin: 0 }}>{mockUserProfile.name}</div>
            <div style={{ margin: 0, color: "#000" }}>
              账号：{mockUserProfile.followers} 粉丝 |{" "}
              {mockUserProfile.following} 关注
            </div>
          </div>
        </div>
      </div>

      <Waterfall
        style={{
          backgroundColor: "#fff",
          padding: "0.2rem 0.5rem 0",
          borderRadius: "1rem",
          marginBottom: "2rem",
        }}
        dataSource={data as unknown as Record<string, WaterfallItem[]>}
        loadMore={loadMore}
        renderItem={renderItem}
        sticky={{
          enable: true,
          // 45px 是 45px 的 header 高度
          // top: `${safeAreaHeight + 45}px`,
          top: `${safeAreaHeight}px`,
        }}
        renderTab={renderTab}
      />
    </div>
  );
};

export default ProfilePage;
