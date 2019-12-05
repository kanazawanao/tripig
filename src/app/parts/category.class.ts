export interface Category {
  value: string;
  viewValue: string;
  icon: string;
  index: number;
}

export const CATEGORIES: Category[] = [
  { value: '観光', viewValue: 'Any Categories', icon: 'local_see', index: 0 },
  { value: 'ショッピング', viewValue: 'Shopping', icon: 'shopping_cart', index: 1 },
  { value: 'カフェ', viewValue: 'Cafe', icon: 'local_cafe', index: 2 },
  { value: 'ホテル', viewValue: 'Hotel', icon: 'hotel', index: 3 },
  { value: 'コンビニ', viewValue: 'Convenience Store', icon: 'local_convenience_store', index: 4 },
  { value: 'ガソリンスタンド', viewValue: 'Gas Station', icon: 'local_gas_station', index: 5 },
  { value: '公園', viewValue: 'Park', icon: 'local_florist', index: 6 },
  { value: 'レストラン', viewValue: 'Restaurant', icon: 'restaurant', index: 7 },
  { value: '遊び', viewValue: '遊び', icon: 'sports', index: 8 },
  { value: '温泉', viewValue: '温泉', icon: 'hot_tub', index: 9 },
  { value: 'ビール', viewValue: 'バー', icon: 'local_bar', index: 10 },
  { value: '動物園', viewValue: 'Zoo', icon: 'pets', index: 11 },
];
