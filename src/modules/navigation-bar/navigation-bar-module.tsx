import { toast } from "sonner";

import { useFlowValidator } from "~/modules/flow-builder/hooks/use-flow-validator";
import { SocialButtonLink } from "~/modules/navigation-bar/components/social-button-link";
import { useApplicationState } from "~/stores/application-state";
import { trackSocialLinkClick } from "~/utils/ga4";

import { Switch } from "~@/components/generics/switch-case";
import { Whenever } from "~@/components/generics/whenever";
import { cn } from "~@/utils/cn";

export function NavigationBarModule() {
    const [isMobileView] = useApplicationState(s => [s.view.mobile]);

    const [isValidating, validateFlow] = useFlowValidator((isValid) => {
        if (isValid)
            toast.success("Flow is valid", { description: "You can now proceed to the next step", dismissible: true });
        else
            toast.error("Flow is invalid", { description: "Please check if the flow is complete and has no lone nodes" });
    });

    return (
        <div className="relative shrink-0 bg-dark-700 px-1.5 py-2">
            <div className="absolute inset-0">
                <div className="absolute h-full w-4/12 from-teal-900/20 to-transparent bg-gradient-to-r <md:(from-teal-900/50)" />
            </div>

            <div className="relative flex items-stretch justify-between gap-x-8">
                <div className="flex items-center py-0.5 pl-2">
                    <div className="size-8 flex shrink-0 select-none items-center justify-center rounded-lg bg-teal-600 text-sm font-bold leading-none">
                        <span className="translate-y-px">
                            DS
                        </span>
                    </div>

                    <div className="ml-3 h-full flex flex-col select-none justify-center gap-y-1 leading-none">
                        <div className="text-sm font-medium leading-none <md:(text-xs)">
                            Chatbot Flow Builder - BiteSpeed Frontend Task
                        </div>

                        <div className="text-xs text-light-50/60 leading-none">
                            By Denish Sharma
                        </div>
                    </div>
                </div>

                <Whenever condition={isMobileView} not>
                    <div className="flex items-center justify-end gap-x-2">
                        <button
                            type="button"
                            className={cn(
                                "h-full flex items-center justify-center outline-none gap-x-2 border border-dark-300 rounded-lg bg-dark-300/50 px-3 text-sm transition active:(bg-dark-400) hover:(bg-dark-200)",
                                isValidating && "cursor-not-allowed op-50 pointer-events-none",
                            )}
                            onClick={() => validateFlow()}
                        >
                            <Switch match={isValidating}>
                                <Switch.Case value>
                                    <div className="i-svg-spinners:180-ring size-5" />
                                </Switch.Case>
                                <Switch.Case value={false}>
                                    <div className="i-mynaui:check-circle size-5" />
                                </Switch.Case>
                            </Switch>
                            <span className="pr-0.5">
                                {isValidating ? "Validating Flow" : "Validate Flow"}
                            </span>
                        </button>

                        <div className="h-4 w-px bg-dark-300" />

                        <div className="flex items-stretch gap-x-0.5">
                            <SocialButtonLink
                                onClick={() => trackSocialLinkClick("linkedin")}
                                href="https://www.linkedin.com/in/denishsharma/"
                            >
                                <div className="i-mynaui:brand-linkedin size-4.5" />
                            </SocialButtonLink>

                            <SocialButtonLink
                                onClick={() => trackSocialLinkClick("github")}
                                href="https://github.com/denishsharma/chatbot-flow-builder-task-bitespeed"
                            >
                                <div className="i-mynaui:brand-github size-4.5" />
                            </SocialButtonLink>
                        </div>
                    </div>
                </Whenever>
            </div>
        </div>
    );
}
