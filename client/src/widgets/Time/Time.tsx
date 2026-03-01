import { useEffect, useState } from "react";
import "./Time.css";

export function useCurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time
}
export default function Time() {
  const currentTime = useCurrentTime();

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");

  return (
    <div className="time-display">
      <span className="hour">{hours}</span>
      <span className="blinking-colon">:</span>
      <span className="minute">{minutes}</span>
    </div>
  );
}

// // widgets/AnalogClock.tsx
// import { useEffect, useState } from "react";
// import "./AnalogClock.css"; // создадим отдельный CSS файл

// export default function AnalogClock() {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Вычисляем углы для стрелок
//   const seconds = time.getSeconds();
//   const minutes = time.getMinutes();
//   const hours = time.getHours() % 12;

//   // Секундная стрелка (360° / 60 секунд = 6° за секунду)
//   const secondAngle = seconds * 6;
//   // Минутная стрелка (360° / 60 минут = 6° за минуту + учитываем секунды для плавности)
//   const minuteAngle = minutes * 6 + seconds * 0.1;
//   // Часовая стрелка (360° / 12 часов = 30° за час + учитываем минуты)
//   const hourAngle = hours * 30 + minutes * 0.5;

//   return (
//     <div className="clock-container">
//       <div className="clock">
//         {/* Разметка часов (12, 3, 6, 9) */}
//         <div className="marker marker-12">12</div>
//         <div className="marker marker-3">3</div>
//         <div className="marker marker-6">6</div>
//         <div className="marker marker-9">9</div>

//         {/* Центральная точка */}
//         <div className="center-dot"></div>

//         {/* Стрелки */}
//         <div
//           className="hand hour-hand"
//           style={{ transform: `rotate(${hourAngle}deg)` }}
//         />
//         <div
//           className="hand minute-hand"
//           style={{ transform: `rotate(${minuteAngle}deg)` }}
//         />
//         <div
//           className="hand second-hand"
//           style={{ transform: `rotate(${secondAngle}deg)` }}
//         />
//       </div>
//     </div>
//   );
// }
