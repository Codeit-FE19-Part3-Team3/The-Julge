import ClockIcon from '@/components/icons/ClockIcon';
import { postClasses } from '@/lib/utils/postClasses';
import { PostTimeProps } from '@/types/post';

const PostTime = ({ workInfo, isGray }: PostTimeProps) => (
  <div className="flex items-start gap-2">
    <ClockIcon className={postClasses.icon({ isActive: isGray })} />
    <time className={postClasses.text({ isActive: isGray })}>
      {workInfo.text}
    </time>
  </div>
);

export default PostTime;
