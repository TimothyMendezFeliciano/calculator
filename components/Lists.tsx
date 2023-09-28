import {GoHistory} from "react-icons/go";

interface Props {
    title: string
    list: string[]
}

export default function Lists({title, list}: Props) {
    return (
        <>
            <div className={'flex items-center'}>
                <h1 className={'text-base font-bold mx-2 underline'}>
                    {title}
                </h1>
                <GoHistory/>
            </div>
            <ul role={'list'} className={'divide-y divide-gray-500'}>
                {list.map((item, index) => (
                    <li key={index} className={'p-4'}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    )
}