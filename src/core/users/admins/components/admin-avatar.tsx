import { Admin } from "@/payload-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const AdminAvatar = ({ admin }: { admin: Admin }) => {
  return (
    <Avatar>
      <AvatarImage src={admin.avatarUrl} alt={admin.name} />
      <AvatarFallback>{admin.name[0]}</AvatarFallback>
    </Avatar>
  )
}