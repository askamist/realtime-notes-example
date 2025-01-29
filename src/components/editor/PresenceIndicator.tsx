interface User {
  name: string;
  color: string;
  id: string;
}

interface PresenceIndicatorProps {
  users: User[];
}

export function PresenceIndicator({ users }: PresenceIndicatorProps) {
  return (
    <div className="flex gap-2 items-center">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-1"
          style={{ color: user.color }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: user.color }} />
          <span className="text-sm">{user.name}</span>
        </div>
      ))}
    </div>
  );
}
