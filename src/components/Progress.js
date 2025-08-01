function Progress({ index, numQuestion, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress ">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question {index} / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
