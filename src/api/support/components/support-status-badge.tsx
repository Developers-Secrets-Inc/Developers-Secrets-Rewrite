import { Badge } from "@/components/ui/badge"

export const SupportStatusBadge = ({ status }: { status: 'online' | 'maintenance' | 'offline' }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'online':
          return 'bg-emerald-500'
        case 'maintenance':
          return 'bg-amber-500'
        case 'offline':
          return 'bg-red-500'
        default:
          return 'bg-emerald-500'
      }
    }
  
    return (
      <Badge variant="outline" className="gap-1.5 rounded-sm">
        <span className={`size-1.5 rounded-full ${getStatusColor()}`} aria-hidden="true"></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }
  