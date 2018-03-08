import styles from './index.scss';

function config(config) {
  window.w3lib = Object.assign({}, window.w3lib, config);
}

export default {
  styles,
  config
};
