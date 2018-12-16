import { useState } from 'react';
import { Modal } from 'antd';
import { Query } from 'react-apollo';
import { GET_RECOMMEND_USERS } from 'Queries/users';
import SelectTag from 'Components/Common/SelectTag';
import UserTag from 'Components/Common/UserTag';
import get from 'Utils/get';

function InviteModal({ visible, onCancel, onOk, classificationId, questionId }) {
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  return (
    <Query
      skip={!visible}
      variables={{ classificationId, questionId }}
      query={GET_RECOMMEND_USERS}
    >
      {
        ({ data }) => {
          const recommendUsers = get(data, 'recommendUsers') || {};
          const teachers = recommendUsers.teachers || [];
          const students = recommendUsers.students || [];
          const users = [
            ...teachers.filter((teacher, i) => selectedTeachers[i]).map((teacher) => teacher.id),
            ...students.filter((student, i) => selectedStudents[i]).map((student) => student.id),
          ];

          return (
            <Modal
              title="邀请回答"
              onOk={() => onOk(users)}
              onCancel={onCancel}
              visible={visible}
            >
              {
                teachers.map((teacher, i) => (
                  <SelectTag
                    style={{ marginRight: '4px' }}
                    onClick={
                      () => {
                        if (!teacher.isInvited) {
                          selectedTeachers[i] = !selectedTeachers[i];

                          setSelectedTeachers(selectedTeachers);
                        }
                      }
                    }
                    isSelected={teacher.isInvited || selectedTeachers[i]}
                    key={teacher.id}
                    tag={<UserTag group="Teacher" />}
                    text={teacher.name} />
                ))
              }
              {
                students.map((student, i) => (
                  <SelectTag
                    style={{ marginRight: '4px' }}
                    onClick={
                      () => {
                        if (!student.isInvited) {
                          selectedStudents[i] = !selectedStudents[i];

                          setSelectedStudents(selectedStudents);
                        }
                      }
                    }
                    isSelected={student.isInvited || selectedStudents[i]}
                    key={student.id}
                    tag={<UserTag group="Student" />}
                    text={student.name} />
                ))
              }
            </Modal>
          );
        }
      }
    </Query>
  );
}

export default InviteModal;
