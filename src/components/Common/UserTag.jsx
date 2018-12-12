import { Tag } from 'antd';

export default function UserTag({ group }) {
  return (
    group === 'Student' ? <Tag color="#108ee9">学 生</Tag> : <Tag color="#faad14">老 师</Tag>
  );
}