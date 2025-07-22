// components/icons.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconProps = {
    size: number;
    color: string;
    weight?: 'regular' | 'bold' | 'fill';
};

const getIconName = (
    name: string, weight?: string) => {
    if (weight === 'fill') return `${name}` as const;
    return name as const;
};

export const ArrowLeft = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="arrow-left" {...props} />
);

export const House = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name={getIconName('home', weight)} {...props} />
);

export const CurrencyDollar = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="currency-usd" {...props} />
);

export const Receipt = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="receipt" {...props} />
);

export const ChartLine = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="chart-line" {...props} />
);

export const Robot = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="robot" {...props} />
);

export const Bank = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="bank" {...props} />
);

export const ChartBar = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="chart-bar" {...props} />
);

export const PresentationChart = ({ weight, ...props }: IconProps) => (
    <MaterialCommunityIcons name="presentation" {...props} />
);
