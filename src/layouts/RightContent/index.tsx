
import AvatarDropdown from './AvatarDropdown';
import SelectLang from './SelectLang';
import styles from './index.less';

const RightContent = () => {

    return (
        <div className={styles['dropdown-box']}>
            <AvatarDropdown />
            <SelectLang />
        </div>
    );
}

export default RightContent;