import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@supabase/supabase-js'

const getAvatarUrl = (user: User) => {
  return user.user_metadata.avatar_url
    ? user.user_metadata.avatar_url
    : user.user_metadata.picture || `https://avatar.vercel.sh/${user.user_metadata.username}`
}

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar>
      <AvatarImage src={getAvatarUrl(user)} alt="Profile image" />
      <AvatarFallback>{user.user_metadata.username[0]}</AvatarFallback>
    </Avatar>
  )
}
