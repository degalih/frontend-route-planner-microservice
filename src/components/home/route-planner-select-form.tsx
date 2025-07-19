'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonArrow } from '@/components/ui/button';
import {
    Command,
    CommandCheck,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const halte = [
    'Pelabuhan Tanjung Perak',
    'Pelindo Place B',
    'Barunawati B',
    'Tanjung Torawitan B',
    'Ikan Kerapu B',
    'Rajawali',
    'Jembatan Merah',
    'Veteran',
    'Tugu Pahlawan',
    'Alun-Alun Contong',
    'Siola',
    'Tunjungan',
    'Simpang Dukuh',
    'Gubernur Suryo',
    'Panglima Sudirman',
    'Sono Kembang',
    'Urip Sumoharjo 2',
    'Pandegiling 2',
    'Santa Maria',
    'Darmo',
    'Marmoyo',
    'Joyoboyo 2',
    'RSAL (Rumah Sakit Angkatan Laut)',
    'Margorejo',
    'Wonocolo',
    'UINSA',
    'Jemur Ngawinan',
    'Siwalankerto B',
    'Kerto Menanggal',
    'Terminal Purabaya',
];

export default function RoutePlannerSelectForm() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
            variant="outline"
            role="combobox"
            mode="input"
            placeholder={!value}
            aria-expanded={open}
            className="w-[200px]"
        >
        <span className={cn('truncate')}>
        {value ? halte.find((item) => item === value) : 'Pilih Halte...'}
        </span>
        <ButtonArrow />
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
        <Command>
            <CommandInput placeholder="Cari Halte..." />
            <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
            {halte.map((item, index) => (
                    <CommandItem
                        key={index}
                        value={item}
                        onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue);
                            setOpen(false);
                        }}>
                        <span className="truncate">{item}</span>
                            {value === item && <CommandCheck />}
                    </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
        </PopoverContent>
        </Popover>
);
}