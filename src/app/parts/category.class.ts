export interface Category {
  value: string;
  viewValue: string;
  icon: string;
  index: number;
  custome: boolean;
}

export const CATEGORIES: Category[] = [
  { value: '観光', viewValue: 'Any Categories', icon: 'local_see', index: 0, custome: false },
  { value: 'レストラン', viewValue: 'Restaurant', icon: 'restaurant', index: 1, custome: false },
  { value: 'ショッピング', viewValue: 'Shopping', icon: 'shopping_cart', index: 2, custome: false },
  { value: 'カフェ', viewValue: 'Cafe', icon: 'local_cafe', index: 3, custome: false },
  { value: 'ホテル', viewValue: 'Hotel', icon: 'hotel', index: 4, custome: false },
  { value: 'コンビニ', viewValue: 'Convenience Store', icon: 'local_convenience_store', index: 5, custome: false },
  { value: 'ガソリンスタンド', viewValue: 'Gas Station', icon: 'local_gas_station', index: 6, custome: false },
  { value: '公園', viewValue: 'Park', icon: 'local_florist', index: 7, custome: false },
  { value: '遊び', viewValue: '遊び', icon: 'sports', index: 8, custome: false },
  { value: '温泉', viewValue: '温泉', icon: 'hot_tub', index: 9, custome: false },
  { value: 'ビール', viewValue: 'ビール', icon: 'beer', index: 10, custome: true },
  { value: '動物園', viewValue: 'Zoo', icon: 'pets', index: 11, custome: false },
  { value: 'キャンプ', viewValue: 'キャンプ', icon: 'tent', index: 12, custome: true },
];
