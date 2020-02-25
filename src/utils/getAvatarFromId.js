
import { getNameFromId } from './getNameFromId';

export function getAvatarFromId(id) {
  getNameFromId(id).split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
}
