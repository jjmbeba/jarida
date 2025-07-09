import type { SlateElementProps, TAudioElement } from 'platejs';
import { SlateElement } from 'platejs';

export function AudioElementStatic(props: SlateElementProps<TAudioElement>) {
  return (
    <SlateElement {...props} className="mb-1">
      <figure className="group relative cursor-default">
        <div className="h-16">
          <audio className="size-full" controls src={props.element.url}>
            <track kind="captions" src="" />
          </audio>
        </div>
      </figure>
      {props.children}
    </SlateElement>
  );
}
