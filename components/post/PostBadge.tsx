import { postClasses } from '@/lib/utils/postClasses';

import BadgeArrow from '../icons/BadgeArrow';

interface Props {
  percentage: number;
  isGray: boolean;
  getBadgeColor: (percentage: number, isBackground?: boolean) => string;
}

const PostBadge = ({ percentage, isGray, getBadgeColor }: Props) => (
  <>
    <span
      className={`${postClasses.badge({ isActive: isGray })} ${getBadgeColor(percentage, true)}`}>
      기존 시급보다 {percentage}%
      <BadgeArrow className={postClasses.badgeArrow()} />
    </span>
    <span
      className={`${postClasses.badgeText({ isActive: isGray })} ${getBadgeColor(percentage, false)}`}>
      기존 시급보다 {percentage}%
      <BadgeArrow className={postClasses.badgeArrow()} />
    </span>
  </>
);

export default PostBadge;
