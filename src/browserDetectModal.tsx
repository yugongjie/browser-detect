import React, { ReactNode, useEffect, useState } from 'react';
import { Modal } from 'antd';
import useBrowserDetect from './useBrowserDetect';
import { BrowserRule } from './type';

interface BrowserDetectModalProps {
  onOk?: () => {};
  onCancel?: () => {};
  content?: ReactNode;
  title?: ReactNode;
  browserRules?: BrowserRule[];
}

// 在浏览器不满足规则的情况下跳出
const BrowserDetectModal = (props: BrowserDetectModalProps) => {
  const { onOk, onCancel, content, title } = props;
  const { browserInfo, browserValid, OSValid, error } = useBrowserDetect();

  const [visible, setVisible] = useState<boolean>(false);
  console.log('browserInfo===', browserInfo);

  useEffect(() => {
    console.log('browserValid', browserValid);
    console.log('browserInfo', browserInfo);

    if (!error && !browserValid) {
      setVisible(true);
    }
  }, [browserValid]);

  const handleOk = () => {
    if (onOk) onOk();
  };

  const handleCancel = () => {
    setVisible(false);
    if (onCancel) onCancel();
  };

  const renderContent = () => {
    if (content) return content;
    return (
      <>
        您的浏览器版本是{browserInfo?.name}
        {browserInfo?.version}
        我们建议您使用新版的
        <a href="https://www.microsoft.com/zh-cn/edge">edge浏览器</a>或者
        <a href="https://www.google.cn/chrome/index.html">chrome浏览器</a> 获得更好的体验
      </>
    );
  };
  return (
    <Modal visible={visible} title={title || '浏览器提示'} onOk={handleOk} onCancel={handleCancel}>
      {/* {renderContent()} */}
      ceshi
    </Modal>
  );
};

export default BrowserDetectModal;
