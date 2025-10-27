

export default function PlayerCard({ name,playerHealth, sprite, isPlayer }
  : { name: string; sprite: string; isPlayer: boolean;playerHealth:number }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 border-2 ${
        isPlayer ? "bg-purple-900/50 border-purple-400" : "bg-red-900/50 border-red-400"
      }`}>
        <img
          src={sprite}
          alt={name}
          className={`w-16 h-16 pixelated ${!isPlayer ? "flipped" : ""}`}
        />
      </div>
<div className="w-24 h-2 bg-gray-700 rounded-full mt-2 relative">
  {/* INNER HEALTH BAR */}
  <div
    className={`h-full rounded-full ${isPlayer ? "bg-purple-500" : "bg-red-500"}`}
    style={{ width: `${playerHealth}%` }} // ✅ percentage added
  />

  {/* HEALTH PERCENTAGE TEXT */}
  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
    {playerHealth}%
  </span>
</div>
    </div>
  );
}
