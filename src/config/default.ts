// 配置类型定义
export interface ConfigOptions {
  mainWidth: number; // 主内容宽度百分比
  backgroundImage: string; // 桌面端背景图片URL
  backgroundImageMobile: string; // 移动端背景图片URL
  enableVideoBackground: boolean; // 是否启用视频背景
  videoBackgroundUrl: string; // 桌面端视频背景URL
  videoBackgroundUrlMobile: string; // 移动端视频背景URL
  blurValue: number; // 磨砂玻璃模糊值
  blurBackgroundColor: string; // 磨砂玻璃背景颜色
  enableTransparentTags: boolean; // 是否启用标签透明背景
  tagDefaultColorList: string; // 标签默认颜色列表
  selectThemeColor: ColorType; // 默认主题颜色
  enableLocalStorage: boolean; // 是否启用本地存储
  selectedDefaultView: ViewModeType; // 默认视图模式
  selectedDefaultAppearance: AppearanceType; // 默认外观模式
  statusCardsVisibility: string; // 状态卡片显示控制
  enableLogo: boolean; // 是否启用Logo
  logoUrl: string; // Logo图片URL
  enableTitle: boolean; // 是否启用标题
  titleText: string; // 标题文本
  enableSearchButton: boolean; // 是否启用搜索按钮
  enableAdminButton: boolean; // 是否启用管理员按钮
  enableJsonRPC2Api: boolean; // 是否启用 JSON-RPC2 API 适配
  isShowStatsInHeader: boolean; // 是否在标题栏中显示统计信息
  mergeGroupsWithStats: boolean; // 是否在统计栏中合并分组
  enableStatsBar: boolean; // 是否启用统计栏
  enableGroupedBar: boolean; // 是否启用分组栏
  enableInstanceDetail: boolean; // 是否启用实例详情
  enablePingChart: boolean; // 是否启用延迟图表
  enableConnectBreaks: boolean; // 是否启用连接断点
  pingChartMaxPoints: number; // 延迟图表最大点数
  enableSwap: boolean; // 是否启用SWAP显示
  isShowHWBarInCard: boolean; // 是否在卡片中显示硬件信息栏
  isShowValueUnderProgressBar: boolean; // 是否在流量进度条下方显示数值
  selectTrafficProgressStyle: "circular" | "linear"; // 流量进度条样式
  enableListItemProgressBar: boolean; // 是否启用列表视图进度条
  fontFamily: string; // 字体族
  fontUrl: string; // 字体URL (本地或CDN)
  backgroundWide: string; // 宽屏壁纸
  backgroundVertical: string; // 竖屏壁纸
  backgroundTablet: string; // 平板设备壁纸
  backgroundMobile: string; // 移动设备壁纸
  globalThemeColor: string; // 全局主题颜色
  siteTitle: string; // 站点名称
  enableSiteIcon: boolean; // 是否显示站点图标
  siteIconUrl: string; // 站点图标URL
}

// 默认配置值
export const DEFAULT_CONFIG: ConfigOptions = {
  mainWidth: 90,
  backgroundImage: "/assets/Moonlit-Scenery.webp",
  backgroundImageMobile: "",
  enableVideoBackground: false,
  videoBackgroundUrl: "/assets/LanternRivers_1080p15fps2Mbps3s.mp4",
  videoBackgroundUrlMobile: "",
  blurValue: 10,
  blurBackgroundColor: "rgba(255, 255, 255, 0.5)|rgba(0, 0, 0, 0.5)",
  enableTransparentTags: true,
  tagDefaultColorList:
    "ruby,gray,gold,bronze,brown,yellow,amber,orange,tomato,red",
  selectThemeColor: "violet",
  enableLocalStorage: true,
  selectedDefaultView: "grid",
  selectedDefaultAppearance: "system",
  statusCardsVisibility:
    "currentTime:true,currentOnline:true,regionOverview:true,trafficOverview:true,networkSpeed:true",
  enableLogo: false,
  logoUrl: "/assets/logo.png",
  enableTitle: true,
  titleText: "Komari",
  enableSearchButton: true,
  enableAdminButton: true,
  enableJsonRPC2Api: false,
  isShowStatsInHeader: false,
  mergeGroupsWithStats: false,
  enableStatsBar: true,
  enableGroupedBar: true,
  enableInstanceDetail: true,
  enablePingChart: true,
  enableConnectBreaks: false,
  pingChartMaxPoints: 0,
  enableSwap: true,
  isShowHWBarInCard: true,
  isShowValueUnderProgressBar: false,
  selectTrafficProgressStyle: "linear",
  enableListItemProgressBar: true,
  fontFamily: "Inter, system-ui, sans-serif", // 默认字体
  fontUrl: "", // 默认为空，表示不加载自定义字体
  backgroundWide: "/assets/wide.webp", // 默认宽屏壁纸
  backgroundVertical: "/assets/vertical.webp", // 默认竖屏壁纸
  backgroundTablet: "", // 平板设备壁纸默认为空
  backgroundMobile: "", // 移动设备壁纸默认为空
  globalThemeColor: "#7e22ce", // 默认紫罗兰色，与 selectThemeColor 一致
  siteTitle: "Komari", // 站点名称
  enableSiteIcon: false, // 默认不显示站点图标
  siteIconUrl: "/assets/pwa-icon.png", // 站点图标URL
};

// 定义颜色类型
export type ColorType =
  | "ruby"
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";
export const allColors: ColorType[] = [
  "ruby",
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
];

export type AppearanceType = "light" | "dark" | "system";
export const allAppearance: AppearanceType[] = ["light", "dark", "system"];

export type ViewModeType = "grid" | "table";
