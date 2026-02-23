import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, { exercises }) => sum + exercises,
    0,
  );

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </>
  );
};

export default Course;
