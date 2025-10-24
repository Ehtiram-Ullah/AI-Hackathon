

export default function PlayerCard({ name, sprite, isPlayer }: { name: string; sprite: string; isPlayer: boolean }) {
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
      <p className={`text-sm font-bold ${isPlayer ? "text-purple-300" : "text-red-300"}`}>{name}</p>
      <div className="w-24 h-2 bg-gray-700 rounded-full mt-2">
        <div className={`h-full rounded-full ${isPlayer ? "bg-purple-500" : "bg-red-500"}`} style={{ width: "100%" }} />
      </div>
    </div>
  );
}
