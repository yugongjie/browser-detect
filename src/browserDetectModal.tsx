import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, Typography } from 'antd';
import { getLocalStorage, getSessionStorage, setLocalStorage, setSessionStorage } from './storage';
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';
import useBrowserDetect from './useBrowserDetect';
import { BrowserRule, OSName } from './type';
import { STORAGE_KEY } from './constance';

const { Paragraph } = Typography;
/**
 * @type remind
 * 仅提示，弹窗可观
 * @type forcus
 * 弹窗不可关闭
 */
type ModalMode = 'remind' | 'forcus';
/**
 * @type once
 * 仅第一次使用时进行检查
 * @type onceBySession
 * 每次打开会话时进行检查
 * @type eachPage
 * url变化时进行检查
 */
type CheckMode = 'once' | 'onceBySession' | 'eachPage';
interface BrowserDetectModalProps {
  onOk?: () => {};
  onCancel?: () => {};
  // 自定义提示内容
  content?: ReactNode;
  // 自定义标题
  title?: ReactNode;
  // 浏览器规则
  browserRules?: BrowserRule[];
  // 操作系统规则
  OSRules?: OSName[];
  // 严格模式
  strict?: boolean;
  // 弹窗模式
  modalMode?: ModalMode;
  // 检查模式
  checkMode?: CheckMode;
  // 如果需要开启每页检查，需要传入此参数
  pathname?: string;
}

// 在浏览器不满足规则的情况下跳出
const BrowserDetectModal = (props: BrowserDetectModalProps) => {
  const {
    onOk,
    onCancel,
    content,
    title,
    browserRules,
    strict = false,
    modalMode = 'remind',
    checkMode = 'once',
    pathname = '',
  } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const { browserValid, OSValid, error } = useBrowserDetect({
    browserRules,
    strict,
  });
  // 获取提示已读状态
  const getReaded = () => {
    try {
      if (checkMode === 'once') {
        return getLocalStorage(STORAGE_KEY) === 'readed';
      }
      if (checkMode === 'onceBySession') {
        return getSessionStorage(STORAGE_KEY) === 'readed';
      }
    } catch (e) {
      console.warn(e);
      return false;
    }
    return false;
  };

  // 设置提示已读状态
  const setReaded = () => {
    try {
      if (checkMode === 'once') {
        setLocalStorage(STORAGE_KEY, 'readed');
      }
      if (checkMode === 'onceBySession') {
        setSessionStorage(STORAGE_KEY, 'readed');
      }
    } catch (e) {
      console.warn(e);
    }
    return false;
  };

  useEffect(() => {
    const shouldVisible = error || (!browserValid && !visible);
    // 每页检查模式
    // 不检查readed状态
    if (checkMode === 'eachPage') {
      if (shouldVisible) {
        setVisible(true);
      }
      return;
    }

    // 检查readed状态
    const isRead = getReaded();
    if (shouldVisible && !isRead) {
      setVisible(true);
    }
  }, [pathname]);

  const handleOk = () => {
    if (checkMode === 'onceBySession' || checkMode === 'once') {
      setReaded();
    }
    setVisible(false);
    if (onOk) {
      onOk();
      return;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    if (onCancel) {
      onCancel();
      return;
    }
  };

  const renderContent = () => {
    if (content) return content;
    return (
      <Paragraph>
        <ul>
          {!OSValid && (
            <li style={{ marginBottom: 12 }}>
              您当前使用的操作系统版本过低
              <br />
              我们建议您使用 <strong>windows10</strong> 操作系统
              <br />
            </li>
          )}
          {!browserValid && (
            <li>
              您当前使用的浏览器版本过低
              <br /> 请下载最新版的
              <a target="_blank" href="https://www.microsoft.com/zh-cn/edge">
                edge浏览器
              </a>
              或者
              <a target="_blank" href="https://www.google.cn/chrome/index.html">
                chrome浏览器
              </a>
            </li>
          )}
        </ul>
      </Paragraph>
    );
  };

  const forcusOption = (() => {
    if (modalMode === 'forcus') {
      return {
        footer: false,
        closable: false,
      };
    }
  })();
  return (
    <Modal
      visible={visible}
      title={
        title || (
          <>
            <InfoCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
            提示
          </>
        )
      }
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      {...forcusOption}
    >
      {renderContent()}
    </Modal>
  );
};

export default BrowserDetectModal;
