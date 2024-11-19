import Modal, {ModalProps} from "react-responsive-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePlanet } from "@/app/hook/usePlanet";
import { useAuth } from "@/app/hook/useAuth";
import { AnyAction } from "@wharfkit/session";
import generateRandomId from "@/app/common/constants/generate-random-id.constant";
import { useFeedbackModal } from "@/app/hook/useFeedbackModal";
import { useArbiters } from "@/app/hook/useArbiters";
import {
  mainTokenContract,
  mainTokenSymbol,
  propWorldsContract,
  testTokenContract,
  testTokenSymbol,
} from "@/app/common/constants/token.constant";
import { useBalance } from "@/app/hook/useBalance";
import { Input } from "../../generic/input";
import { Button } from "../../generic/buttons/button";
import { useCustomers } from "@/app/hook/useKYC";
import FileUpload from "./file-upload";

interface CreateProposalModalProps extends ModalProps {
  // Define props here
}

enum ExecutionTime {
  OneWeek = "1 week",
  TwoWeeks = "2 weeks",
  ThreeWeeks = "3 weeks",
  OneMonth = "1 month",
}

type Field =
  | "title"
  | "amount"
  | "executionTime"
  | "url"
  | "arbiterWallet"
  | "arbiterReward"
  | "description"
  | "chargeAdviceRequired";

interface ICreateProposalInput {
  title: string;
  amount: number;
  executionTime: ExecutionTime;
  url: string;
  arbiterWallet: string;
  arbiterReward: number;
  description: string;
  chargeAdviceRequired: boolean;
}

enum executionTimeToDuration {
  "1 week" = 7 * 24 * 60 * 60,
  "2 weeks" = 14 * 24 * 60 * 60,
  "3 weeks" = 21 * 24 * 60 * 60,
  "1 month" = 30 * 24 * 60 * 60,
}

export const CreateProposalModal = ({ onClose, open: openModal }: CreateProposalModalProps) => {
  const { handleShowFeedbackModal } = useFeedbackModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<ICreateProposalInput>();

  const { activeUserData } = useAuth();
  const { planetName } = usePlanet();
  const { isCustomer } = useCustomers();

  const { arbiters } = useArbiters();
  const { testaBalance, tlmBalance } = useBalance();

  const onSubmit: SubmitHandler<ICreateProposalInput> = async (data: {
    title: any;
    amount: any;
    executionTime: string | number;
    url: any;
    arbiterWallet: any;
    arbiterReward: any;
    description: any;
  }) => {
    try {
      console.log(data);
      if (!activeUserData?.actor) {
        throw new Error("No active user data found");
      }
      const isTestaPlanet = planetName === "testa";
      const tokenSymbol = isTestaPlanet ? testTokenSymbol : mainTokenSymbol;
      const tokenContract = isTestaPlanet
        ? testTokenContract
        : mainTokenContract;

      const balance = isTestaPlanet ? testaBalance : tlmBalance;

      if (balance.amount < 120) {
        throw new Error("Insufficient balance to create proposal");
      }

      const createProposalActionData: AnyAction = {
        account: propWorldsContract,
        name: "createprop",
        authorization: [{ actor: activeUserData.actor, permission: "active" }],
        data: {
          proposer: activeUserData.actor.toString(),
          title: data.title,
          amount: data.amount,
          execution_time: data.executionTime,
          url: data.url,
          arbiter: data.arbiterWallet,
          arbiter_pay: {
            contract: tokenContract,
            quantity: `${data.arbiterReward}.0000 ${tokenSymbol}`,
          },
          proposal_pay: {
            contract: tokenContract,
            quantity: `120.0000 ${tokenSymbol}`,
          },
          summary: data.description,
          content_hash: data.url,
          id: generateRandomId(),
          category: 0,
          job_duration: executionTimeToDuration[data.executionTime],
          dac_id: planetName,
        },
      };

      const result = await activeUserData.transact({
        actions: [createProposalActionData],
      });

      if (!result) {
        throw new Error("Transaction failed");
      }

      handleShowFeedbackModal(true, {
        message:
          "Proposal created successfully, please wait for the DAO and Arbiter to approve it.",
        type: "success",
      });
      reset();
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  const arbiterWallets = Array.isArray(arbiters)
    ? arbiters.map((arbiter) => arbiter.arbiter)
    : [];

  const fields = [
    {
      label: "Proposal Title:",
      type: "text",
      name: "title" as unknown as Field,
      required: true,
      placeholder: "Title of your proposal",
      maxLength: 50,
    },
    {
      label: "Amount:",
      type: "number",
      name: "amount" as unknown as Field,
      required: true,
      placeholder: "Amount needed in TLM",
    },
    {
      label: "Execution Time:",
      type: "select",
      name: "executionTime" as unknown as Field,
      required: true,
      options: Object.values(ExecutionTime),
      placeholder: "Select Execution Time for your proposal",
    },
    {
      label: "URL:",
      type: "text",
      name: "url" as unknown as Field,
      required: true,
      placeholder: "File URL related to your proposal",
    },
    {
      label: "Arbiter Wallet:",
      type: "select",
      name: "arbiterWallet" as unknown as Field,
      required: false,
      options: arbiterWallets,
      placeholder: "Select Arbiter Wallet for your proposal",
    },
    {
      label: "Arbiter Reward:",
      type: "number",
      name: "arbiterReward" as unknown as Field,
      required: true,
      placeholder: "Reward Amount in TLM",
    },
    {
      label: "Description:",
      type: "textarea",
      name: "description" as unknown as Field,
      required: true,
      placeholder: "Description of your proposal",
      maxLength: 200,
    },
    {
      label: "*Each Submitted Proposal will be charged 120 TLM",
      type: "checkbox",
      name: "chargeAdviceRequired" as unknown as Field,
      required: true,
      placeholder: "",
    },
  ];

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      styles={{
        modal: {
          backgroundColor: "#030303",
          borderRadius: "10px",
          width: "50%",
          maxWidth: "700px",
          padding: "0px",
        },
        modalContainer: {
          display: "flex",
          justifyContent: "right",
        },
      }}
    >
      {isCustomer ? (
        <>
          <div className="bg-white flex w-full h-12 items-center pl-12 text-black">
            <h2 className="font-black text-2xl">Create New Proposal</h2>
          </div>

          <form
            className="flex flex-col gap-5 p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Proposal Title:"
              name="title"
              register={register}
              placeholder="Title of your proposal"
              required={true}
            />

            <Input
              placeholder="Amount needed in TLM"
              name="amount"
              type="number"
              label="Amount:"
              register={register}
              required={true}
            />
            <label className="flex flex-col gap-1">
              Execution Time:
              <select
                {...register("executionTime", { required: true })}
                className="h-10 p-2 bg-black border-white border-solid border-[1px]"
              >
                <option value={""} disabled defaultValue={""}>
                  Select Execution Time for your proposal
                </option>
                {Object.values(ExecutionTime).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <Input
              label="IPFS:"
              name="url"
              register={register}
              required={true}
              placeholder="Upload your IPFS before"
            />
            <FileUpload setValue={setValue} />

            <label className="flex flex-col gap-1">
              Arbiter Wallet:
              <select
                {...register("arbiterWallet", { required: false })}
                className="h-10 p-2 bg-black border-white border-solid border-[1px]"
              >
                <option value={""} disabled defaultValue={""}>
                  Select Arbiter Wallet for your proposal
                </option>
                {arbiterWallets?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <Input
              label="Arbiter Reward:"
              name="arbiterReward"
              register={register}
              required={true}
              placeholder="Reward Amount in TLM"
              type="number"
            />
            <label className="flex flex-col gap-1">
              Description:
              <textarea
                placeholder="Description of your proposal"
                {...register("description", { required: true })}
                maxLength={200}
                className="h-20 p-2 bg-black border-white border-solid border-[1px]"
              />
            </label>
            <label className="flex gap-3 items-center justify-center">
              <input
                type="checkbox"
                {...register("chargeAdviceRequired", { required: true })}
              />
              <span>*Each Submitted Proposal will be charged 120 TLM</span>
            </label>
            {fields.map(
              (field, index) =>
                errors[field.name] && (
                  <span key={index} className="text-red-500">
                    {field.name} This field is required
                  </span>
                )
            )}
            <Button state="active" type="submit">
              Submit New Proposal
            </Button>
          </form>
        </>
      ) : (
        <div className="flex flex-col justify-between items-center gap-3 min-h-[300px]">
          <div className="bg-white flex w-full h-12 items-center pl-12 text-black">
            <h2 className="font-black text-2xl">Create New Proposal</h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <h2 className="font-extralight text-2xl">Get KYC Compliant</h2>
            <div>
              In order to create a <b>Worker Proposal</b>, you must be
              <br />
              KYC Compliant. This is to ensure all Explorers are valid
              <br />
              Human Beings. Please follow the process and best
              <br />
              pratices when creating a Worker Proposal: <br />
              <div className="flex flex-col max-w-[300px] items-center justify-center text-center w-full justify-self-center">
                <b
                  className="text-[#00FFFF] cursor-pointer"
                  onClick={() => open("https://alienworlds.io/kyc-compliant")}
                >
                  alienworlds.io/kyc-compliant
                </b>
                <hr className="w-full border-[#00FFFF]" />
              </div>
            </div>
            <Button
              state="active"
              onClick={() => open("https://verifyme.alienworlds.io")}
            >
              I&apos;M READY TO BE KYC COMPLIANT
            </Button>{" "}
          </div>
        </div>
      )}
    </Modal>
  );
};
