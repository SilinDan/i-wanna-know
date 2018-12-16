import { Tag } from 'antd';

export default function UserTag({ group }) {
  return (
    group === 'Student' ? (
      <Tag style={{ margin: 0 }} color="#108ee9">学 生</Tag>
    ) : (
        <Tag color="#faad14" style={{ margin: 0 }}>老 师</Tag>
      )
  );
}