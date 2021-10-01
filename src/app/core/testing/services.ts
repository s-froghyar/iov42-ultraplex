import { of } from "rxjs";

export class MockBsModalService {
    onHide: any;
    show(): void {}
}
export class MockModalRef {
    hide(): void {}
}
export class MockCinemaService {
    getInitialData = () => of([null, null, null])
}
export class MockChangeDetRef {
    detectChanges(): void {}
}

export class MockIntersectionObserver {
    observe() {};
    unobserve() {};
}
