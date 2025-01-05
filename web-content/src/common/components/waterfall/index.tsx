import React, { useRef, useEffect, useState } from "react";
import { throttle } from "../../utils/performance";

export interface WaterfallItem {
  name: string;
  image?: string;
  author?: string;
  price?: number;
  likes?: number;
  [key: string]: unknown;
}

const AutoBalancingWaterfall = ({
  columnData,
  loadMore,
  numColumns = 2,
  renderItem,
}: {
  columnData: WaterfallItem[];
  loadMore: () => void;
  numColumns?: number;
  renderItem: (item: WaterfallItem) => JSX.Element;
}) => {
  const [columns, setColumns] = useState<WaterfallItem[][]>(
    Array(numColumns).fill([])
  );
  const feedsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (columnData.length > 0) {
      distributeItems(columnData);
    }
  }, [columnData]);

  useEffect(() => {
    const handleScroll = () => {
      const container = feedsContainerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 200) {
          loadMore();
        }
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    const container = feedsContainerRef.current;

    container?.addEventListener("scroll", throttledHandleScroll);
    return () =>
      container?.removeEventListener("scroll", throttledHandleScroll);
  }, [loadMore]);

  const distributeItems = (items: WaterfallItem[]) => {
    const newColumns = Array(numColumns)
      .fill([])
      .map(() => [] as WaterfallItem[]);

    items.forEach((item) => {
      const shortestColumnIndex = newColumns.reduce(
        (minIndex, _, index) =>
          getTotalHeight(newColumns[index]) <
          getTotalHeight(newColumns[minIndex])
            ? index
            : minIndex,
        0
      );
      newColumns[shortestColumnIndex].push(item);
    });
    setColumns(newColumns);
  };

  const getTotalHeight = (column: WaterfallItem[]) => {
    return column.reduce((total) => total + 100, 0);
  };

  return (
    <div
      ref={feedsContainerRef}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "8px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {columns.map((column, columnIndex) => (
        <div key={`column-${columnIndex}`} style={{ flex: 1 }}>
          {column.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

interface StickyConfig {
  enable?: boolean;
  top?: number | string;
}

export const Waterfall = ({
  dataSource,
  loadMore,
  renderItem,
  renderTab,
  sticky = {},
  style = {},
}: {
  dataSource: Record<string, WaterfallItem[]>;
  loadMore?: () => void;
  renderItem?: (item?: WaterfallItem) => React.ReactNode | JSX.Element;
  renderTab?: (tabKey: string, isActive: boolean) => React.ReactNode;
  sticky?: StickyConfig;
  style?: React.CSSProperties;
}) => {
  const iteratorData = Object.entries(dataSource);
  const [activeTabIndex, setActiveTabIndex] = useState<string>(
    iteratorData[0]?.[0]
  );

  return (
    <div style={{ height: "100%", ...style }}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
            ...(sticky?.enable && {
              position: "sticky",
              top: sticky.top || 0,
              backgroundColor: "white",
              zIndex: 1,
            }),
          }}
        >
          {iteratorData.map(([tabKey]) => (
            <div key={tabKey} onClick={() => setActiveTabIndex(tabKey)}>
              {renderTab ? (
                renderTab(tabKey, activeTabIndex === tabKey)
              ) : (
                <span
                  style={
                    activeTabIndex === tabKey ? { background: "orange" } : {}
                  }
                >
                  {tabKey}
                </span>
              )}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <AutoBalancingWaterfall
            columnData={dataSource[activeTabIndex]}
            loadMore={loadMore || (() => {})}
            renderItem={(item) => (
              <div
                style={{
                  marginBottom: "4px",
                  padding: "12px 0",
                }}
              >
                {renderItem ? renderItem(item) : <div>{item.name}</div>}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
