export interface Category {
  value: string;
  viewValue: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { value: '観光', viewValue: 'Any Categories', icon: 'local_see' },
  { value: 'ショッピング', viewValue: 'Shopping', icon: 'shopping_cart' },
  { value: 'カフェ', viewValue: 'Cafe', icon: 'local_cafe' },
  { value: 'ホテル', viewValue: 'Hotel', icon: 'hotel' },
  { value: 'コンビニ', viewValue: 'Convenience Store', icon: 'local_convenience_store' },
  { value: 'ガソリンスタンド', viewValue: 'Gas Station', icon: 'local_gas_station' },
  { value: '公園', viewValue: 'Park', icon: 'local_florist' },
  { value: 'レストラン', viewValue: 'Restaurant', icon: 'restaurant' },
  { value: '遊び', viewValue: '遊び', icon: 'sports' },
  { value: '温泉', viewValue: '温泉', icon: 'hot_tub' },
  { value: 'ビール', viewValue: 'バー', icon: 'local_bar' },
  { value: '動物園', viewValue: 'Zoo', icon: 'pets' },
];
