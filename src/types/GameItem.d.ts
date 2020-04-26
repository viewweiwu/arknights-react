/*
 * @Author: your name
 * @Date: 2020-04-26 11:15:54
 * @LastEditTime: 2020-04-26 11:17:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /arknights-react/src/types/GameItem.d.ts
 */
declare interface GameItem {
  name: string,
  description: string,
  usage: string,
  obtain_approach: Array<string>,
  rarity: string,
  file: string,
  category: Array<string>,
  id: string
}
