import MapIcon from '@/components/icons/MapIcon';
import { postClasses } from '@/lib/utils/postClasses';
import { PostLocationProps } from '@/types/post';

const PostLocation = ({ location, isGray }: PostLocationProps) => (
  <div className="flex items-center gap-2">
    <MapIcon className={postClasses.icon({ isActive: isGray })} />
    <span className={postClasses.text({ isActive: isGray })}>{location}</span>
  </div>
);

export default PostLocation;
