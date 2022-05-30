import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { darkly, DarklyView } from 'rn-darkly';
import { RMotionView, rmotion } from 'rmotion';
import { ShadowView } from '@liuyunjs/react-native-simple-shadow-view';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';

export type SwitchProps = {
  tintColor?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const DarklyRMotionShadowView = rmotion(darkly(ShadowView, 'style'));

const DarklyRMotionView = darkly(RMotionView, 'style');

const config = { duration: 200 };

const Switch: React.FC<SwitchProps> = ({
  tintColor,
  disabled,
  onChange,
  checked: checkedInput,
}) => {
  const [checked, setChecked] = useReactionState(!!checkedInput);

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPress={() => {
        setChecked(!checked);
        onChange?.(!checked);
      }}>
      <DarklyView
        dark_style={[
          styles.darkContainer,
          checked && { backgroundColor: tintColor },
        ]}
        style={[
          styles.container,
          checked && { backgroundColor: tintColor },
          disabled && styles.disabled,
        ]}>
        <DarklyRMotionView
          dark_style={styles.darkTrack}
          config={config}
          animate={{
            scale: +!checked,
          }}
          style={styles.track}
        />
        <DarklyRMotionShadowView
          dark_style={styles.darkThumb}
          config={config}
          animate={{
            translateX: checked ? (I18nManager.isRTL ? -20 : 20) : 0,
          }}
          style={styles.thumb}
        />
      </DarklyView>
    </TouchableWithoutFeedback>
  );
};

const DarklySwitch = darkly(Switch, 'tintColor');

DarklySwitch.defaultProps = {
  tintColor: '#4dd865',
  dark_tintColor: '#297435',
};

const MemoSwitch = React.memo(DarklySwitch);

export { MemoSwitch as Switch };

const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: '#e5e5e5',
  },
  darkContainer: {
    backgroundColor: '#3b3b3b',
  },

  disabled: {
    opacity: 0.3,
  },

  track: {
    position: 'absolute',
    left: 1.5,
    top: 1.5,
    right: 1.5,
    bottom: 1.5,
    borderRadius: 14,
    backgroundColor: '#fff',
  },

  darkTrack: {
    backgroundColor: '#1b1b1b',
  },

  thumb: {
    width: 28,
    height: 28,
    position: 'absolute',
    left: 1.5,
    top: 1.5,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: I18nManager.isRTL ? -2 : 2,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,
  },

  darkThumb: {
    backgroundColor: '#000',
    shadowColor: '#ccc',
    shadowOpacity: 0.21,
  },
});
