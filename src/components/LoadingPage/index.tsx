import React from 'react';
import { ActivityIndicator, Flex } from 'antd-mobile';

const styles = {
  container: {
    height: '100%',
  },
  text: {
    marginLeft: 8,
  },
};

export default function ({ style = {}, text = '正在加载中...', textStyle = {} }: any) {
  return (
    <Flex justify="center" style={{ ...styles.container, ...style }}>
      <ActivityIndicator />
      <span
        style={{
          ...styles.text,
          ...textStyle,
        }}
      >
        {text}
      </span>
    </Flex>
  );
}
