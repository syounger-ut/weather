source "$(dirname "$0")"/../../../.env

function has_env_vars_set {
  ENV_VARS_NOT_SET=()

  # LOOP THROUGH FUNCTION PROPERTIES, AND ADD TO ARRAY IF NOT SET TO ENV VARIABLES;
  for var in "$@"
  do
    if [[ -z "${!var}" ]]; then
      ENV_VARS_NOT_SET+=($var)
    fi
  done

  # IF THERE ARE NO ENV VARIABLES SET, RAISE ALERT AND BREAK;
  if [[ ${#ENV_VARS_NOT_SET[@]} > 0 ]]; then
    RED='\033[0;31m'
    NC='\033[0m' # No Color
    echo -e "⚠️ Environment variables [${RED}${ENV_VARS_NOT_SET[@]}${NC}] are empty."
    echo -e "   * Set in the ${RED}.env${NC} file"
    exit 1
  fi
}
