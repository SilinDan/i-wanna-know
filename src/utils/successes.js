import { message } from 'antd';

function handleSuccess(data) {
  if (data.code === 200) {
    message.success(data.message);

    return true;
  } else {
    message.error(data.message);

    return false;
  }
}

export default handleSuccess;
